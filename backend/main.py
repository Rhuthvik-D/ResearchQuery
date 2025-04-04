from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain.agents import create_tool_calling_agent, AgentExecutor
from tools import search_tool, wiki_tool, save_tool, elsevier_tool, springer_nature_tool

load_dotenv()
class QueryInput(BaseModel):
    query: str

class QueryResponse(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools_used: list[str]



llm = ChatAnthropic(model = "claude-3-7-sonnet-20250219")
parser = PydanticOutputParser(pydantic_object = QueryResponse)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
            You are a helpful assistant that uses academic tools like Elsevier, Nature, or ACS whenever possible before using Wikipedia. 
            Your responses should prioritize academic resources for research purposes, ensuring credibility and accuracy.
            Wrap the output in this format and provide no other text\n{format_instructions}
            """,
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{query}"),
        ("placeholder", "{agent_scratchpad}"),
    ]
).partial(format_instructions = parser.get_format_instructions())

tools = [search_tool, wiki_tool, save_tool, elsevier_tool, springer_nature_tool]

# tools = [springer_nature_tool]

agent = create_tool_calling_agent(
    llm = llm,
    prompt = prompt,
    tools = tools
)


agent_executor = AgentExecutor(agent = agent, tools = tools, verbose = True) #verbose to see thought process of the agent
# query = input("What are you looking for?")
# raw_response = agent_executor.invoke({"query": query})

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(("/query"))
async def handle_query(request: QueryInput):
    raw_response = agent_executor.invoke({"query": request.query})

    try:
        return parser.parse(raw_response.get("output")[0]["text"])
    except Exception as e:
        return {"error": str(e), "raw_response": raw_response}

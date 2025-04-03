from langchain_community.tools import WikipediaQueryRun, DuckDuckGoSearchRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain.tools import Tool
from datetime import datetime
import requests
import os
import certifi
from dotenv import load_dotenv

load_dotenv()


def save_to_file(data: str, filename: str = "search_output.txt"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_data = f"--- Search Output ---\nTimestamp: {timestamp}\n\n{data}\n\n"

    with open(filename, "a", encoding = "utf-8") as file:
        file.write(formatted_data)

    return f"Data saved to {filename} at {timestamp}"

def search_elsevier(query:str) -> str:
    api_key = os.getenv("ELSEVIER_API_KEY")
    url = "http://api.elsevier.com/content/search/scopus" #root-endpoint, change made from https to http
    params = {"query": query, "apiKey": api_key, "count": 5}
    headers = {"Accept": "application/json"}
    response = requests.get(url, params = params, headers = headers)#recheck certifications

    # print(f"Response status code: {response.status_code}")
    # print("----------------------------------------------------------------------------------------------------")
    # print(f"Response text: {response.text}")
    # print("----------------------------------------------------------------------------------------------------")


    if response.status_code != 200:
        return "f[Elsevier] Error {}: {}".format(response.status_code, response.text)
    data = response.json()
    entries = data.get('search-results', {}).get('entry', [])
    return "\n\n".join(
        f"• {entry.get('dc:title')} - {entry.get('prism:publicationName')}"
        for entry in entries
    )


save_tool = Tool(
    name = "save_to_file",
    func = save_to_file,
    description = "Saves structured data to a text file.",
)

search = DuckDuckGoSearchRun()

search_tool = Tool(
    name = "search",
    func = search.run,
    description = "Search web for information.",
)

elsevier_tool = Tool(
    name = "ElsevierSearch",
    func = search_elsevier,
    description = "Search academic publications on Elsevier Scopus.",
)

api_wrapper = WikipediaAPIWrapper(top_k_results = 1, doc_content_chars_max = 100)
wiki_tool = WikipediaQueryRun(api_wrapper = api_wrapper)

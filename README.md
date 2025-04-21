# **Academic Search Assistant**

A full-stack web application that allows users to query multiple academic research databases and get summaries with sources. The backend uses a **LangChain** agent with multiple tools (including **Elsevier**, **Springer Nature**, and **Wikipedia**), and the frontend allows easy interaction with the system, presenting the results in an elegant user interface. 

## **Features**
- **Search academic sources**: Supports querying **Elsevier** (Scopus), **Springer Nature**, and **Wikipedia** for academic articles.
- **Save search results**: Users can download search summaries into a text file.
- **Dark and Light theme**: The app supports dynamic theme switching with a slider.
- **Responsive UI**: The interface adapts to different screen sizes.

## **Frontend Tech Stack**
- **React** (with TypeScript)
- **Tailwind CSS** for styling
- **Axios** for handling HTTP requests
- **Uvicorn** for the FastAPI backend

## **Backend Tech Stack**
- **FastAPI** for the API server
- **LangChain** for querying multiple tools (including Elsevier and Springer Nature APIs)
- **Certifi** for secure requests (with SSL verification)


## **Caution on Using Anthropic API Key**

Please note that **using the Anthropic API** (for features such as disabling an API key) comes with associated **costs**. The API is not free, and you will be charged based on your usage of the service. Make sure to use the API responsibly and only for necessary requests to avoid unnecessary charges.

### **Important Points**:
- The API key required for **Anthropic** services is a **paid API key**.
- Usage of the API to disable or manage keys may result in costs.
- Be cautious and monitor your usage if you're using the API extensively.
  
You should obtain an **Anthropic API key** from their [official website](https://www.anthropic.com/) and **set it securely** in your environment variables.

---

## **Installation and Setup**

### **1. Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/academic-search-assistant.git
cd academic-search-assistant
```

### **2. Set Up the Backend**

#### **Backend Requirements**:
Ensure you have Python 3.7+ installed. Then, create a virtual environment for the backend.

1. **Create a virtual environment**:

   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:
   - On **Windows**:

     ```bash
     .\venv\Scripts\activate
     ```

   - On **Mac/Linux**:

     ```bash
     source venv/bin/activate
     ```

3. **Install the requirements**:

   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Set up environment variables**:
   
   Create a `.env` file in the `backend` directory and add your API keys for Elsevier and Springer Nature.

   Example:

   ```
   ELSEVIER_API_KEY=your_elsevier_api_key
   SPRINGER_NATURE_API_KEY=your_springer_nature_api_key
   ```

   This allows the backend to authenticate with the APIs.

5. **Run the backend**:

   Open a terminal window and navigate to the `backend` directory:

   ```bash
   cd backend
   uvicorn main:app --reload --port 8000
   ```

   This will start the backend server on **port 8000**.

### **3. Set Up the Frontend**

#### **Frontend Requirements**:
Make sure you have **Node.js** and **npm** installed. If not, install them from [Node.js official website](https://nodejs.org/).

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install the frontend dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend server**:

   ```bash
   npm start
   ```

   This will start the frontend server, typically accessible at **http://localhost:3000**.

---

## **Usage**

### **1. Enter Your Research Query**

- **Text Input**: On the main screen, you’ll see a large text input area (a **textarea**) where you can type your **research query**. This is where you can ask questions or provide topics that you want to search for in academic databases like **Elsevier**, **Springer Nature**, and **Wikipedia**.
  
  **Example**:
  - "What are the latest advancements in AI?"
  - "Research on climate change and its effects on agriculture"
  - "Flash Joule heating in material science"

### **2. Submit the Query**

- **Submit Button**: After entering your query, click on the **Submit** button below the text box. This action will send the query to the backend for processing.
- **Loading Indicator**: While your query is being processed, the button will display a **loading indicator** ("Searching...") to let you know that the search is in progress.

  The backend will then make requests to the relevant APIs (like **Elsevier**, **Springer Nature**, or **Wikipedia**) to fetch relevant articles and summaries related to your query.

### **3. View Search Results**

Once the backend completes the search, the results will be displayed on the screen. The results are organized as follows:

- **Topic**: The main topic of the research (or the title of the search results).
- **Summary**: A brief summary of the research findings based on the query. This may include key points, highlights, or an abstract from the papers.
- **Sources**: A list of sources or articles from which the data was retrieved, such as journal names, article links, or author names.

  **Example**:
  - **Topic**: "Recent Advancements in AI Research"
  - **Summary**: "AI research has made significant strides in machine learning, especially in neural networks and deep learning models..."
  - **Sources**: 
    - Journal of AI Research
    - Springer AI Papers 2021

  This section of the interface will dynamically update as per the search query results, providing the user with the relevant academic information.

### **4. Download Search Summary**

- **Download Button**: After reviewing the search results, you can download the search summary for future reference.
  - **File Format**: The summary will be saved as a `.txt` file containing the topic, summary, and sources.
  - **Download Action**: When you click the **Download Summary** button, the content will be formatted into a text file and automatically saved to your computer.
  
  **Filename Format**: 
  - The filename will follow the format `search_summary_<timestamp>.txt`, where `<timestamp>` is the current date and time, ensuring unique filenames for every search.
  
  **Example**:
  - Filename: `search_summary_2025-03-01_12-45-30.txt`
  
  Once the file is downloaded, you can open it using any text editor or share it for reference or further research.

---

## **Requirements**

**Backend**:
- Python 3.7+
- FastAPI
- Requests
- LangChain
- Uvicorn

**Frontend**:
- Node.js
- npm
- React
- Tailwind CSS
- Axios

---

## **Future Enhancements**
- Add more academic data sources.
- Improve user interface and performance.
- Add user authentication for personalized search results.

---

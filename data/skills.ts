export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Agentic & Generative AI',
    icon: '🤖',
    skills: [
      'LangChain',
      'LangGraph',
      'OpenAI API',
      'Anthropic',
      'Hugging Face',
      'Multi-agent Systems',
      'RAG',
      'Semantic Search',
      'ChromaDB',
      'FAISS',
      'N8N',
      'Make.com',
      'Context Window Optimization',
    ],
  },
  {
    name: 'ML / Deep Learning',
    icon: '🧠',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'XGBoost',
      'Keras',
      'YOLOv8',
      'OpenCV',
      'LoRA Fine-tuning',
      'Transformers',
      'MLflow',
      'ONNX',
      'Model Versioning',
    ],
  },
  {
    name: 'Data Science & Analytics',
    icon: '📊',
    skills: [
      'Pandas',
      'NumPy',
      'SQL',
      'Matplotlib',
      'Seaborn',
      'Plotly',
      'Tableau',
      'Power BI',
      'Streamlit',
      'Gradio',
      'EDA',
      'Feature Engineering',
      'Hypothesis Testing',
    ],
  },
  {
    name: 'MLOps & Deployment',
    icon: '⚙️',
    skills: [
      'FastAPI',
      'Docker',
      'CI/CD Pipelines',
      'GitHub Actions',
      'NLTK',
      'SpaCy',
      'TypeScript / Next.js',
    ],
  },
];

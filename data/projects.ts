export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'broadway-pizza-chatbot',
    title: 'Broadway Pizza Chatbot',
    category: 'RAG · CHATBOT',
    description:
      'RAG-based chatbot for Broadway Pizza Pakistan that eliminates hallucinations by grounding responses in a live SQLite database.',
    techStack: ['Python', 'Gemini LLM', 'RAG', 'SQLite', 'Streamlit'],
    githubUrl: 'https://github.com/JamilRaza001/broadway-pizza-chatbot',
    liveUrl: 'https://broadway-pizza-chatbot.streamlit.app',
    featured: true,
  },
  {
    id: 'pothole-detection',
    title: 'Pothole Detection (YOLOv8)',
    category: 'COMPUTER VISION · EDGE AI',
    description:
      'Edge-ready road damage detection pipeline trained on annotated road images, exported for real-world inference deployment.',
    techStack: ['YOLOv8', 'OpenCV', 'Python', 'ONNX'],
    githubUrl: 'https://github.com/JamilRaza001/pothole-detection-yolov8',
    featured: true,
  },
  {
    id: 'spacex-launch-prediction',
    title: 'SpaceX Launch Prediction',
    category: 'MLOps · DASHBOARD',
    description:
      'End-to-end ML pipeline with Random Forest Classifier, Streamlit dashboard, Folium maps, and containerized scheduled retraining.',
    techStack: ['Scikit-learn', 'Streamlit', 'Docker', 'Folium', 'MLflow'],
    githubUrl: 'https://github.com/JamilRaza001/spacex-launch-prediction',
    liveUrl: 'https://spacex-launch-prediction.streamlit.app',
    featured: true,
  },
  {
    id: 'heart-disease-prediction',
    title: 'Heart Disease Prediction',
    category: 'CLINICAL ML · MONITORING',
    description:
      'Logistic Regression model with k-fold CV (80–87% accuracy) on 1,025 patient records, with data drift and cohort monitoring.',
    techStack: ['Scikit-learn', 'Streamlit', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/JamilRaza001/heart-disease-prediction',
    featured: true,
  },
  {
    id: 'real-estate-prediction',
    title: 'Real Estate Price Prediction',
    category: 'DATA SCIENCE · ML',
    description:
      'Machine learning model predicting property prices using regression techniques and feature engineering on real estate data.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/JamilRaza001/real-estate-prediction',
    featured: false,
  },
  {
    id: 'secure-data-encryption',
    title: 'Secure Data Encryption',
    category: 'SECURITY · PYTHON',
    description:
      'Python-based tool implementing symmetric and asymmetric encryption algorithms for secure data storage and transmission.',
    techStack: ['Python', 'Cryptography', 'FastAPI'],
    githubUrl: 'https://github.com/JamilRaza001/secure-data-encryption',
    featured: false,
  },
];

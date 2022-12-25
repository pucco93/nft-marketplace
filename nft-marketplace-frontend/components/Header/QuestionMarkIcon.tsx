import styles from "./Header.module.scss";

const QuestionMarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 1200 1200"
      className={styles.questionMarkIcon}
    >
      <path
        d="m92.309 600c0-280.39 227.3-507.69 507.69-507.69s507.69 227.3 507.69 507.69-227.3 507.69-507.69 507.69-507.69-227.3-507.69-507.69zm507.69-600c-331.37 0-600 268.63-600 600s268.63 600 600 600 600-268.63 600-600-268.63-600-600-600zm-44.891 717.59c0 27.664 14.785 41.5 44.359 41.5 29.57 0 44.359-13.836 44.359-41.5 0-18.441 2.6406-32.93 7.9219-43.473 5.6289-10.539 13.73-19.43 24.289-26.672 10.914-7.2461 24.117-15.152 39.605-23.715 15.141-7.9023 31.684-17.945 49.641-30.137 17.953-12.184 33.27-28.816 45.945-49.891 13.023-21.078 19.535-49.07 19.535-83.98 0-61.914-16.016-107.86-48.055-137.83-32.035-29.969-81.145-44.953-147.33-44.953h-70.766c-65.477 0-114.41 15.148-146.8 45.449-32.391 30.297-48.586 76.074-48.586 137.33 0 27.664 14.789 41.496 44.359 41.496 29.574 0 44.359-13.832 44.359-41.496 0-38.203 7.3945-64.387 22.18-78.547s42.949-21.242 84.488-21.242h70.766c41.895 0 70.055 6.918 84.492 20.75 14.785 13.5 22.18 39.848 22.18 79.039 0 18.441-2.8164 32.934-8.4492 43.473-5.2812 10.539-13.375 19.43-24.293 26.672-10.559 7.2461-23.59 15.152-39.078 23.715-15.137 7.9023-31.684 17.945-49.637 30.133s-33.445 28.82-46.473 49.895c-12.672 21.078-19.012 49.07-19.012 83.98zm-10.559 165.98c0 26.352 14.078 39.52 42.246 39.52h25.348c26.754 0 40.129-13.168 40.129-39.52v-24.699c0-25.688-13.375-38.531-40.129-38.531h-25.348c-28.168 0-42.246 12.844-42.246 38.531z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default QuestionMarkIcon;
import { useNavigate } from "react-router-dom";

function ToTheHomePage() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        return navigate("/");
      }}
    >
      Visszatérés a főoldalra
    </button>
  );
}

export default ToTheHomePage;

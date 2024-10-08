import { useQuizesStore } from '../store/quizes';
import { getQuizesRequest } from '../api/quizes';
import Loader from '../components/Loader';
import QuizItem from '../components/QuizItem';
import { Quiz } from '../types-d';
import { useQuery, } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


const QuizList: React.FC = () => {
  const { quizes } = useQuizesStore();

  const { isLoading, error, data } = useQuery<Quiz[], Error>({
   queryKey: ['quizes'],
    queryFn: getQuizesRequest,
    
});

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error al cargar los quizzes: {error.message}</p>;
  }

const quizzesToMap = data as Quiz[] || quizes

console.log(quizzesToMap)

  return (
    <><div>
      {quizzesToMap.map((quiz: Quiz) => (
        <QuizItem key={quiz.id} quiz={quiz} />
      ))}
    </div><Link to="/quizes/create" className="text-center text-xl font-bold text-primary-800">
        Create Quiz
        </Link></>
  );
};

export default QuizList;


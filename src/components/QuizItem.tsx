import { Card, CardContent, Typography, Stack } from '@mui/material';
import SolutionItem from './SolutionItem';
import { Quiz, QuizSolution } from '../types-d';
import { Link } from 'react-router-dom';

interface QuizItemProps {
  quiz: Quiz;
}



const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {quiz.description}
        </Typography>

        {quiz.winner_solution && (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Solución Ganadora: {quiz.winner_solution.content}
            </Typography>
            
          </>
        )}
      </CardContent>

      {quiz.solutions?.length > 0 && (
        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          {quiz.solutions.map((solution: QuizSolution) => (
            <SolutionItem key={solution.id} solution={solution} />
          ))}
        </Stack>
      )}
      {quiz.solutions?.length === 0 && (
        <><Typography variant="body2" color="text.secondary" sx={{ mt: 2, ml: 2 }}>
          No hay soluciones para este quiz
        </Typography>
        <Link to={`/quizes/solutions/${quiz.id}`} className="text-center text-xl ml-2 font-bold text-primary-800">
         Create Solution
        </Link>
        </>
      )}
    </Card>
  );
};

export default QuizItem;

import { Card, CardContent, Stack, Typography, } from '@mui/material';
import { Quiz, QuizSolution } from '../types-d';
import SolutionItem from './SolutionItem';
        
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
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Solución Ganadora: 
                    <SolutionItem solution={quiz.winner_solution} /> 
                  </Typography>
                )}
              </CardContent>
        
              
              {quiz.solutions?.length > 0 && (
                <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                  {quiz.solutions.map((solution: QuizSolution) => (
                  <Typography key={solution.id}>
                    <SolutionItem solution={solution} />
                  </Typography>
                ))}
                </Stack>
            )}
            </Card>
          );
        };
  
export default QuizItem
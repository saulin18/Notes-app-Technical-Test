import { Typography } from '@mui/material';
import { QuizSolution } from '../types-d';

interface SolutionItemProps {
  solution: QuizSolution;
}


const SolutionItem: React.FC<SolutionItemProps> = ({ solution }) => {
return (
  <Typography variant="body2" color="text.secondary" sx={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #ccc' }}>
    {solution.content} 
  </Typography>
);

}

export default SolutionItem;

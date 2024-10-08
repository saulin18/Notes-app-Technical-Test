import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createQuizeRequest } from '../api/quizes';
import { toast } from 'sonner';
import { queryClient } from '../main';


const QuizCreate = () => {
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: createQuizeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizes"] });
      toast.success("Quiz creado correctamente!");
      navigate("/quizes");
    },
    onError: () => {
      toast.error("Error! Intenta de nuevo");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const quiz = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
    };
    createMutation.mutate(quiz);
    console.log(quiz)
  };

  return (
    <div>
      <form className='flex flex-col gap-3 items-center justify-center' onSubmit={handleSubmit}>
        <label className='text-primary-800' htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        <label className='text-primary-800' htmlFor="description">Description</label>
        <textarea id="description" name="description" required></textarea>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizCreate;

import Quiz from './Components/Quiz/Quiz'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Quiz />
    </QueryClientProvider>
  )
}

export default App
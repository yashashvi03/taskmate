// import TaskManager from "./components/TaskManager"
// import "./App.css"

// function App() {
//   return (
//     <main className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-5xl mx-auto">
//         <header className="mb-8 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Task Mate</h1>
//           <p className="text-gray-600 mt-2">Your Advanced To-Do List Web App</p>
//         </header>
//         <TaskManager />
//       </div>
//     </main>
//   )
// }

// export default App


import TaskManager from "./components/TaskManager"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Task Mate
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Your Advanced To-Do List Web App</p>
        </header>
        <TaskManager />
      </main>
    </div>
  )
}

export default App

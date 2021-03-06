import React, { useEffect, useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { createWorkout } from "./graphql/mutations";
import { listWorkouts } from "./graphql/queries";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: "", description: "" };

function App({ signOut, user }) {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listWorkouts));
      const todos = todoData.data.listWorkouts.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  //When testing make sure to refresh!!!!!!!!!!
  async function addTodo() {
    try {
      await API.graphql(
        graphqlOperation(createWorkout, {
          input: {
            name: "Push ups",
            totalrepcount: 20,
            duration: 50,
            workoutclass: "strength and conditioning",
            location: "apartment complex cvill",
            description: "core and strength stability",
          },
        })
      );
      window.location.reload(false);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }
  return (
    <div style={styles.container}>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <h2>Amplify Todos</h2>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={(event) => setInput("description", event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>
        Create Todo
      </button>
      {todos.map((todo, index) => (
        <div key={todo.id ? todo.id : index} style={styles.todo}>
          <p style={styles.todoName}>{todo.name}</p>
          <p style={styles.todoName}>{todo.totalrepcount}</p>
          <p style={styles.todoDescription}>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default withAuthenticator(App);

//-----------------------------------------------------------------------------//

// /* src/App.js */
// import React, { useEffect, useState } from "react";
// import Amplify, { API, graphqlOperation } from "aws-amplify";
// import { createWorkout } from "./graphql/mutations";
// import { listWorkouts } from "./graphql/queries";

// //problem code - test
// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);
// //

// const initialState = { name: "", description: "" };

// function App() {
//   const [formState, setFormState] = useState(initialState);
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   function setInput(key, value) {
//     setFormState({ ...formState, [key]: value });
//   }

//   async function fetchTodos() {
//     try {
//       const todoData = await API.graphql(graphqlOperation(listWorkouts));
//       const todos = todoData.data.listWorkouts.items;
//       setTodos(todos);
//     } catch (err) {
//       console.log("error fetching todos");
//     }
//   }

//   // async function addTodo() {
//   //   try {
//   //     if (!formState.name || !formState.description) return;
//   //     const todo = { ...formState };
//   //     setTodos([...todos, todo]);
//   //     setFormState(initialState);
//   //     await API.graphql(graphqlOperation(createTodo, { input: todo }));
//   //   } catch (err) {
//   //     console.log("error creating todo:", err);
//   //   }
//   // }

//   //When testing make sure to refresh!!!!!!!!!!
//   async function addTodo() {
//     try {
//       await API.graphql(
//         graphqlOperation(createWorkout, {
//           input: {
//             name: "Push ups",
//             totalrepcount: 20,
//             duration: 50,
//             workoutclass: "strength and conditioning",
//             location: "apartment complex cvill",
//             description: "core and strength stability",
//           },
//         })
//       );
//     } catch (err) {
//       console.log("error creating todo:", err);
//     }
//   }

//   return (
//     <div style={styles.container}>
//       <h2>Amplify Todos</h2>
//       <input
//         onChange={(event) => setInput("name", event.target.value)}
//         style={styles.input}
//         value={formState.name}
//         placeholder="Name"
//       />
//       <input
//         onChange={(event) => setInput("description", event.target.value)}
//         style={styles.input}
//         value={formState.description}
//         placeholder="Description"
//       />
//       <button style={styles.button} onClick={addTodo}>
//         Create Todo
//       </button>
//       {todos.map((todo, index) => (
//         <div key={todo.id ? todo.id : index} style={styles.todo}>
//           <p style={styles.todoName}>{todo.name}</p>
//           <p style={styles.todoName}>{todo.totalrepcount}</p>
//           <p style={styles.todoDescription}>{todo.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     width: 400,
//     margin: "0 auto",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     padding: 20,
//   },
//   todo: { marginBottom: 15 },
//   input: {
//     border: "none",
//     backgroundColor: "#ddd",
//     marginBottom: 10,
//     padding: 8,
//     fontSize: 18,
//   },
//   todoName: { fontSize: 20, fontWeight: "bold" },
//   todoDescription: { marginBottom: 0 },
//   button: {
//     backgroundColor: "black",
//     color: "white",
//     outline: "none",
//     fontSize: 18,
//     padding: "12px 0px",
//   },
// };

// export default App;

//----------------------------------------------------------------------------------------------//

// import logo from "./logo.svg";
// import "./App.css";

// import React, { useEffect, useState } from "react";
// import Amplify, { API, graphqlOperation } from "aws-amplify";
// import { createWorkout } from "./graphql/mutations";
// import { listWorkouts } from "./graphql/queries";

// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

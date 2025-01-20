import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Edit, Plus, Check, X } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from './store/todoSlice';
import type { RootState } from './store/store';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodoHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && user) {
      dispatch(addTodo({ text: newTodo.trim(), userId: user.username }));
      setNewTodo('');
    }
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText.trim() }));
      setEditingId(null);
    }
  };

  const userTodos = todos.filter(todo => todo.userId === user?.username);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Welcome to Todo App</h2>
            <p className="text-center text-gray-600">Please sign up or login to manage your todos.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
          <form onSubmit={addTodoHandler} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-1"
            >
              <Plus size={20} />
              Add
            </button>
          </form>

          <div className="space-y-3">
            {userTodos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-2 p-3 bg-gray-50 rounded-lg ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="w-5 h-5 text-purple-500 rounded focus:ring-purple-500"
                />
                
                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 ${
                        todo.completed ? 'line-through text-gray-500' : ''
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="text-blue-600 hover:text-blue-700 p-1"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => dispatch(deleteTodo(todo.id))}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {userTodos.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No todos yet. Add one above!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
import { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import TaskForm from '../components/TaskForm';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task', error);
            }
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleSuccess = () => {
        setEditingTask(null);
        fetchTasks();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <TaskForm
                        currentTask={editingTask}
                        onSuccess={handleSuccess}
                        onCancel={() => setEditingTask(null)}
                    />
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {tasks.map((task) => (
                                <li key={task._id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-medium text-indigo-600 truncate">{task.title}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {task.status}
                                                </span>
                                                <span className="ml-4">Assigned to: {task.assignedTo?.name || 'Unassigned'}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {tasks.length === 0 && (
                                <li className="px-6 py-4 text-center text-gray-500">No tasks found. Create one!</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

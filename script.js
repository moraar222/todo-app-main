// Select the theme switcher button element from the DOM
const themeSwitcher = document.querySelector('#theme-switcher');

// Select the theme image element from the DOM
const themeimage = document.querySelector('#theme-image');

// Add an event listener to the theme switcher button for a click event
themeSwitcher.addEventListener('click', () => {
  // Check if the body currently has the 'dark-mode' class
  if (document.body.classList.contains('dark-mode')) {
    // If it has, remove 'dark-mode' class and add 'light-mode' class
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    // Change the theme image source to the moon icon
    themeimage.src = 'images/icon-moon.svg';
  } else {
    // If it doesn't have 'dark-mode' class, remove 'light-mode' class and add 'dark-mode' class
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    // Change the theme image source to the sun icon
    themeimage.src = 'images/icon-sun.svg';
  }
});

// Wait for the DOM content to fully load before running this code block
document.addEventListener('DOMContentLoaded', () => {
  // Select the to-do list container element from the DOM
  const todoList = document.querySelector('#todo-list');
  // Select the input field for new to-dos from the DOM
  const newTodoInput = document.querySelector('.new-todo');
  // Select the element displaying the number of items left from the DOM
  const itemsLeft = document.querySelector('.footer span');
  // Select all filter buttons from the DOM
  const filterButtons = document.querySelectorAll('.filters button');
  // Select the clear completed button from the DOM
  const clearCompletedButton = document.querySelector('.clear-completed');

  // Initialize an array of to-do objects with id, title, and status
  let todos = [
    { id: 1, title: 'Complete online JavaScript course', status: 'completed' },
    { id: 2, title: 'Jog around the park 3x', status: 'active' },
    { id: 3, title: '10 minutes meditation', status: 'active' },
    { id: 4, title: 'Read for 1 hour', status: 'active' },
    { id: 5, title: 'Pick up groceries', status: 'active' },
    { id: 6, title: 'Complete Todo App on Frontend Mentor', status: 'active' }
  ];

  // Function to render the to-dos based on the current filter
  function renderTodos(filter = 'all') {
    // Clear the current to-do list content
    todoList.innerHTML = '';
    // Filter the to-dos based on the filter parameter ('all', 'active', or 'completed')
    const filteredTodos = todos.filter(todo => {
      if (filter === 'all') return true; // Show all to-dos
      if (filter === 'active') return todo.status === 'active'; // Show only active to-dos
      if (filter === 'completed') return todo.status === 'completed'; // Show only completed to-dos
    });

    // Loop through the filtered to-dos and create list items
    filteredTodos.forEach(todo => {
      // Create a list item element
      const todoItem = document.createElement('li');
      // Set the class name to 'completed' if the to-do is completed
      todoItem.className = todo.status === 'completed' ? 'completed' : '';
      // Set the inner HTML of the list item with a checkbox and the to-do title
      todoItem.innerHTML = `
        <input type="checkbox" ${todo.status === 'completed' ? 'checked' : ''}>
        ${todo.title}
      `;
      // Append the list item to the to-do list
      todoList.appendChild(todoItem);

      // Select the checkbox element inside the list item
      const checkbox = todoItem.querySelector('input[type="checkbox"]');
      // Add an event listener to the checkbox for a change event
      checkbox.addEventListener('change', () => {
        // Update the to-do status based on the checkbox state
        todo.status = checkbox.checked ? 'completed' : 'active';
        // Re-render the to-dos with the current filter
        renderTodos(filter);
        // Update the count of items left
        updateItemsLeft();
      });
    });

    // Update the count of items left after rendering
    updateItemsLeft();
  }

  // Function to update the items left count
  function updateItemsLeft() {
    // Count the number of active to-dos
    const activeTodosCount = todos.filter(todo => todo.status === 'active').length;
    // Update the text content of the items left element
    itemsLeft.textContent = `${activeTodosCount} items left`;
  }

  // Function to add a new to-do to the list
  function addNewTodo() {
    // Get the trimmed value of the input field
    const title = newTodoInput.value.trim();
    // If the input is not empty, create a new to-do object
    if (title) {
      todos.push({
        id: todos.length + 1, // Generate a new id for the to-do
        title, // Set the title of the to-do
        status: 'active' // Set the initial status to active
      });
      // Clear the input field
      newTodoInput.value = '';
      // Re-render the to-dos
      renderTodos();
    }
  }

  // Event listener for adding a new to-do when pressing Enter
  newTodoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      // Call the function to add a new to-do
      addNewTodo();
    }
  });

  // Event listeners for filtering to-dos by status
  filterButtons.forEach(button => {
    // Add a click event listener to each filter button
    button.addEventListener('click', () => {
      // Remove the 'active' class from all filter buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add the 'active' class to the clicked button
      button.classList.add('active');
      // Re-render the to-dos based on the selected filter
      renderTodos(button.id);
    });
  });

  // Event listener for clearing all completed to-dos
  clearCompletedButton.addEventListener('click', () => {
    // Remove all to-dos with a 'completed' status
    todos = todos.filter(todo => todo.status !== 'completed');
    // Re-render the to-dos
    renderTodos();
  });

  // Initial rendering of the to-dos when the page loads
  renderTodos();
});

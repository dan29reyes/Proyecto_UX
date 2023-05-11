/*

// Obtener todas las listas del tablero
const lists = document.querySelectorAll('.list');

// Para cada lista, agregar un contenedor y un botón "Agregar tarea"
lists.forEach(list => {
  const container = document.createElement('div');
  container.classList.add('add-card-container');
  list.appendChild(container);

  const addCardBtn = document.createElement('button');
  addCardBtn.classList.add('add-card');
  addCardBtn.textContent = '+ Agregar tarea';
  container.appendChild(addCardBtn);

  // Al hacer clic en el botón, pedir al usuario el contenido de la tarjeta
  addCardBtn.addEventListener('click', () => {
    Swal.fire({
      title: 'Ingrese el contenido de la tarjeta:',
      input: 'text',
      inputPlaceholder: 'Contenido',
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const content = result.value;
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', true);
        card.innerHTML = `<p>${content}</p>`;

        card.addEventListener('mouseover', () => {
          editBtn.style.display = 'block';
          deleteBtn.style.display = 'block';
        });
        card.addEventListener('mouseout', () => {
          editBtn.style.display = 'none';
          deleteBtn.style.display = 'none';
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.style.display = 'none';
        card.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.style.display = 'none';
        card.appendChild(deleteBtn);

        editBtn.addEventListener('click', () => {
          const card = editBtn.parentElement;
          const text = card.querySelector('p');
          const input = document.createElement('input');
          input.type = 'text';
          input.value = text.textContent;
          card.replaceChild(input, text);
          const saveBtn = document.createElement('button');
          saveBtn.textContent = 'Guardar';
          editBtn.remove();
          deleteBtn.remove();
          card.appendChild(saveBtn);

          saveBtn.addEventListener('click', () => {
            const newText = input.value;
            text.textContent = newText;
            card.replaceChild(document.createElement('p'), input);
            card.querySelector('p').textContent = newText;
            saveBtn.remove();
          });
        });

        // Borrar una tarjeta al hacer clic en el botón "Borrar"
        deleteBtn.addEventListener('click', () => {
          card.remove();
        });

        container.insertBefore(card, addCardBtn.nextSibling);
      }
    });
  });

  // Permitir arrastrar y soltar tareas entre listas
  list.addEventListener('dragover', e => {
    e.preventDefault();
    const draggable = document.querySelector('.card.dragging');
    if (draggable) {
      const afterElement = getDragAfterElement(list, e.clientY);
      if (afterElement == null) {
        list.appendChild(draggable);
      } else {
        list.insertBefore(draggable, afterElement);
      }
    }
  });

  // Permitir arrastrar y soltar tareas dentro de la misma lista
  list.addEventListener('dragstart', e => {
    const draggable = e.target;
    draggable.classList.add('dragging');
  });

  document.addEventListener('dragend', e => {
    const draggable = document.querySelector('.card.dragging');
    if (draggable) {
      draggable.classList.remove('dragging');
    }
  });
});


*/


//Obtener todas las listas del tablero
const lists = document.querySelectorAll('.list');

// Para cada lista, agregar un contenedor y un botón "Agregar tarea"
lists.forEach(list => {
  const container = document.createElement('div');
  container.classList.add('add-card-container');
  list.appendChild(container);

  const addCardBtn = document.createElement('button');
  addCardBtn.classList.add('add-card');
  addCardBtn.textContent = '+ Agregar tarea';
  container.appendChild(addCardBtn);
  // Al hacer clic en el botón, pedir al usuario el contenido de la tarjeta
  addCardBtn.addEventListener('click', () => {
    const content = prompt('Ingrese el contenido de la tarjeta:');
    if (content) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('draggable', true);
      card.innerHTML = `<p>${content}</p>`;
      card.addEventListener('mouseover', () => {
        editBtn.style.display = 'block';
        deleteBtn.style.display='block';
      });
      card.addEventListener('mouseout', () => {
        editBtn.style.display = 'none';
        deleteBtn.style.display='none';

       

      });
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.style.display = 'none';
      card.appendChild(editBtn);
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Borrar';
      deleteBtn.style.display = 'none';
      card.appendChild(deleteBtn);
      
    
    
      
  
      editBtn.addEventListener('click', () => {
       const card = editBtn.parentElement;
        const text = card.querySelector('p');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text.textContent;
        card.replaceChild(input, text);
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Guardar';
        editBtn.remove();
        deleteBtn.remove();
        card.appendChild(saveBtn);
        saveBtn.addEventListener('click', () => {
          const newText = input.value;
          text.textContent = newText;
          card.replaceChild(document.createElement('p'), input);
          card.querySelector('p').textContent = newText;
          saveBtn.remove();
        });
      });
      card.appendChild(editBtn);

      //esta era lo que me faltaba lol el perro evento
      deleteBtn.addEventListener('click', () => {
        card.remove();
        });

      container.insertBefore(card, addCardBtn.nextSibling);
    }
  });

  // Permitir arrastrar y soltar tareas entre listas
  list.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      list.appendChild(draggable);
    } else {
      list.insertBefore(draggable, afterElement);
    }
  });
});

// Función auxiliar para obtener el elemento después del cual soltar una tarea
function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll('.card:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
// Permitir arrastrar y soltar tareas dentro de la misma lista
document.addEventListener('dragstart', e => {
  const draggable = e.target.closest('.card');
  if (draggable) {
    draggable.classList.add('dragging');
  }
});

document.addEventListener('dragend', e => {
  const draggable =
    document.querySelector('.card.dragging');
  if (draggable) {
    draggable.classList.remove('dragging');
  }
});


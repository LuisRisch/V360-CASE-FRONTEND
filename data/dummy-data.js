const lists = [
  {
    id: 1,
    title: "Lista 1",
    description: "Descrição da lista 1",
    tasks: [
      {
        id: 1,
        title: "Tarefa 1",
        description: "Descrição da tarefa 1",
        completed: true,
        priority: "Baixa",
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "Descrição da tarefa 2",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 3,
        title: "Tarefa 3",
        description: "Descrição da tarefa 3",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 4,
        title: "Tarefa 4",
        description: "Descrição da tarefa 4",
        completed: false,
        priority: "Baixa",
      }
    ]
  },
  {
    id: 2,
    title: "Lista 2",
    description: "Descrição da lista 2",
    tasks: [
      {
        id: 1,
        title: "Tarefa 1",
        description: "Descrição da tarefa 1",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "Descrição da tarefa 2",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 3,
        title: "Tarefa 3",
        description: "Descrição da tarefa 3",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 4,
        title: "Tarefa 4",
        description: "Descrição da tarefa 4",
        completed: false,
        priority: "Baixa",
      }
    ]
  },
  {
    id: 3,
    title: "Lista 3",
    description: "Descrição da lista 3",
    tasks: [
      {
        id: 1,
        title: "Tarefa 1",
        description: "Descrição da tarefa 1",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "Descrição da tarefa 2",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 3,
        title: "Tarefa 3",
        description: "Descrição da tarefa 3",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 4,
        title: "Tarefa 4",
        description: "Descrição da tarefa 4",
        completed: false,
        priority: "Baixa",
      }
    ]
  },
  {
    id: 4,
    title: "Lista 4",
    description: "Descrição da lista 4",
    tasks: [
      {
        id: 1,
        title: "Tarefa 1",
        description: "Descrição da tarefa 1",
        completed: false,
        priority: "Média",
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "Descrição da tarefa 2",
        completed: false,
        priority: "Baixa",
      },
      {
        id: 3,
        title: "Tarefa 3",
        description: "Descrição da tarefa 3",
        completed: false,
        priority: "Alta",
      },
      {
        id: 4,
        title: "Tarefa 4",
        description: "Descrição da tarefa 4",
        completed: false,
        priority: "Baixa",
      }, 
      {
        id: 5,
        title: "Tarefa 5",
        description: "Descrição da tarefa 5",
        completed: true,
        priority: "Média",
      },
      {
        id: 6,
        title: "Tarefa 6",
        description: "Descrição da tarefa 6",
        completed: true,
        priority: "Alta",
      }
    ]
  }
];

export const getAllData = () => {
  return lists;
}

export const getDataById = (id) => {
  return lists.find(list => list.id === Number(id));
}
const app = new Vue({
    el: '#app',
    data: {
      newTodo: '',
      todos: [
        {
          id: "task01",
          title: "Practice Vue.js",
          completed: false
        },
        {
          id: "task02",
          title: "Clean my room",
          completed: false
        },
        {
          id: "task03",
          title: "Walk the dog",
          completed: true
        },
      ],
      tab: 'all',
      cacheTodo: {},
      cacheTitle: ''
    },
    methods: {
      addTodo: function(){
        var value = this.newTodo.trim();
        var timestamp = Math.floor(Date.now())
        if(!value){
          return;
        }
        this.todos.push({
          id: timestamp,
          title: value,
          completed: false
        })
        this.newTodo = ""
      },
      removeTodo: function(todoItem){
        var vm = this;
        var newIndex = vm.todos.findIndex(function(item){
           return item.id === todoItem.id;
        })
        this.todos.splice(newIndex, 1) 
      },
      editTodo: function(item){
        this.cacheTodo = item;
        this.cacheTitle = item.title
      },
      cancelEdit: function(){
        this.cacheTodo = {}
      },
      doneEdit: function(item){
        item.title = this.cacheTitle;
        this.cacheTitle = '';
        this.cacheTodo = {}
      },
      clearTodos: function(){
        this.todos = []
      }
    },
    computed: {
      filterTodo: function(){
        if(this.tab == 'all'){
          return this.todos;  
        } else if (this.tab == 'active'){
          let newTodos = []
          this.todos.forEach( function(item){
            if(!item.completed){
              newTodos.push(item)
            }
          })
          return newTodos;
        } else if (this.tab == 'done'){
          let newTodos = []
          this.todos.forEach( function(item){
            if(item.completed){
              newTodos.push(item)
            }
          })
          return newTodos;
        }
        
      },
      calcWorking: function(){
        let amt = 0;
        this.todos.forEach(function(item){
          if(!item.completed){
            amt++;
          }
        })
        return amt;
      }
    }
  })
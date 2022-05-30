/* Création des localStorage selon les tableaux */
const STORAGE_KEY_LIST = "todoStorageList";
const STORAGE_KEY_LISTENCOURS = "todoStorageListEnCours";
const STORAGE_KEY_LISTTERMINE = "todoStorageListTermine";

/*composant racine */

const app = {
  data() {
    return {
      list: [],
      listEncours: [],
      listTermine: [],
      task: "",
      activeList: "list",
    };
  },

  /* affichage du localStorage List / En cours / Terminé */

  created() {
    this.list = JSON.parse(localStorage.getItem(STORAGE_KEY_LIST) || "[]");

    this.listEncours = JSON.parse(
      localStorage.getItem(STORAGE_KEY_LISTENCOURS) || "[]"
    );

    this.listTermine = JSON.parse(
      localStorage.getItem(STORAGE_KEY_LISTTERMINE) || "[]"
    );
  },

  methods: {
    nouvelleTask(e) {
      this.task = e.target.value;
    },

    addTaskToList() {
      this.list.push(this.task);
      this.task = "";

      //Recupération pour le LS
      localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(this.list));
    },

    changeTaskToInProgress(task, index) {
      this.listEncours.push(this.list[(task, index)]);
      this.list.splice(index, 1);

      localStorage.setItem(
        STORAGE_KEY_LISTENCOURS,
        JSON.stringify(this.listEncours)
      );

      localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(this.list));
    },

    changeTaskDone(task, index) {
      this.listTermine.push(this.listEncours[(task, index)]);
      this.listEncours.splice(index, 1);

      localStorage.setItem(
        STORAGE_KEY_LISTTERMINE,
        JSON.stringify(this.listTermine)
      );

      localStorage.setItem(
        STORAGE_KEY_LISTENCOURS,
        JSON.stringify(this.listEncours)
      );
    },

    onEnter() {
      this.addTaskToList();
    },

    supprimerTaskList(index) {
      this.list.splice(index, 1);

      localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(this.list));
    },

    supprimerTaskEncours(index) {
      this.listEncours.splice(index, 1);

      localStorage.setItem(
        STORAGE_KEY_LISTENCOURS,
        JSON.stringify(this.listEncours)
      );
    },

    supprimerTaskTermine(index) {
      this.listTermine.splice(index, 1);

      localStorage.setItem(
        STORAGE_KEY_LISTTERMINE,
        JSON.stringify(this.listTermine)
      );
    },

    clearAllTask() {
      localStorage.removeItem("todoStorageList");
      localStorage.removeItem("todoStorageListEnCours");
      localStorage.removeItem("todoStorageListTermine");
      document.location.reload();
    },
  },

  template: ` 
  <main>
  <section id="mainContainer">
  <div class="container">
    <!--   NEW TACHE   -->
    <div class="newtask">
      <input
        @input="nouvelleTask"
        @keyup.enter="onEnter"
        type="text"
        :value="task"
        placeholder="Tache à réaliser.."
        class="inputborder"
      />
    </div>

    <!--   SELECTION COMMANDE  -->
    <div class="selection">
      <div class="selectionDeux">
        <button @click="activeList = 'list'" class="tout">Tout ({{list.length}})</button >
        <button @click="activeList = 'listEncours'" class="attente">En attente ({{listEncours.length}})</button >
        <button @click="activeList = 'listTermine'" class="termine">Terminé ({{listTermine.length}})</button >
      </div>
      <button id="clear" @click="clearAllTask">Clear</button>
    </div>

    <div class="border"></div>

    <!--  LIST DE TACHE   -->
    <ul class="task">
      <!-- boucle tache-->
  
      <div v-show= "activeList === 'list'">
      <h3> TOUTES VOS TÂCHES</h3>
        <div class="check" v-for="(task, index) in list">
          <div>
                <input class="checky" type="checkbox" />
                <label>{{task}}</label>
            </div>
            <div>
                
                <button class="changeTask" @click="changeTaskToInProgress(task, index)">p</button>
                <button class="modify" @click="modifierTask(index)"><i class="fa-solid fa-pencil"></i></button>
                <button class="suppr" @click="supprimerTaskList(index)">x</button>
            </div>
        </div>
      </div>
      <div>
      
      <div v-show= "activeList === 'listEncours'">
      <h3>EN ATTENTE</h3>
        <div class="check" v-for="(task, index) in listEncours">
            <div>
                <input class="checky" type="checkbox"/>
                <label>{{task}}</label>
            </div>
            <div>
                <button class="changeTask" @click="changeTaskDone(task, index)">t</button>
                <button class="modify" @click="modifierTask(index)"><i class="fa-solid fa-pencil"></i></button>
                <button class="suppr" @click="supprimerTaskEncours(index)">x</button>
            </div>
        </div>
      </div>
        
        <div v-show= "activeList === 'listTermine'">
        <h3>TERMINÉES</h3>
          <div class="check" v-for="(task, index) in listTermine">
            <div>
                <input class="checky" type="checkbox" />
                <label>{{task}}</label>
            </div>
            <div>
                <button class="modify" @click="modifierTask(index)"><i class="fa-solid fa-pencil"></i></button>
                <button class="suppr" @click="supprimerTaskTermine(index)">x</button>
            </div>
          </div>
        </div>
    

    </ul>
  </div>
</section>
</main>`,
};
Vue.createApp(app).mount("#mainContainer");

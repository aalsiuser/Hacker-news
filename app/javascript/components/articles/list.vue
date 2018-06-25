<template>
<div id="wrapper" class="toggled-2">
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <div class="card mt-4">
        <div class="card-body  background-class">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group row">
                <label for="beerNameBox">Beer name :</label>
                <b-form-input id="beerNameBox" class="form-control check"
                    v-model="searchTitle"
                    type="text"
                    placeholder="Enter title"></b-form-input>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="styleSelect">Sort by date</label>
                <b-form-select id="styleSelect" class="check" v-model="selected">
                  <template slot="first">
                    <option :value="null">please select an option</option>
                  </template>
                  <template slot="first">
                    <option :value="1">old to new</option>
                  </template>
                  <template slot="first">
                    <option :value="2">new to old</option>
                  </template>
                </b-form-select>
              </div>
            </div>
          </div>
          <b-container>
          <b-row class="border-class">
            <b-col class="column-style" v-for="(item,index) in itemsToRender" :key="index">
              <div class="card card-height" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a :href="item.url" target="_blank" class="btn btn-primary">Link to url</a>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><b>Author:</b> {{item.author}}</li>
                  <li class="list-group-item"><b>Number Of Comments:</b> {{item.num_comments}}</li>
                  <li class="list-group-item"><b>Number Of Points:</b> {{item.num_points}}</li>
                </ul>
              </div>
            </b-col>
          </b-row>
          </b-container>
          <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage" @input="sortData()">
          </b-pagination>
      </div>
    </div>
  </div>
 </div>
</div>
</template>
<script>
import axios from "axios";
import { isEmpty as _isEmpty, uniq as _uniq, sortBy as _sortBy } from "lodash";
export default {
  data() {
    return {
      items: [],
      searchTitle: null,
      currentPage: 1,
      selected: null,
      firstData: [],
      perPage: 10,
      totalRows: 0,
      fields: [
        {
          key: "No.",
          sortable: false
        },
        {
          key: "title",
          sortable: true
        },
        {
          key: "author",
          sortable: false
        },
        {
          key: "url",
          sortable: false
        },
        {
          key: "num_comments",
          sortable: true
        },
        {
          key: "num_points",
          sortable: true
        }
      ]
    };
  },
  computed: {
    itemsToRender() {
      if (!this.searchTitle && !this.selected) {
        this.totalRows = this.items.length;
        return this.firstData.slice(0, 9);
      }
      if (this.searchTitle) {
        debugger;
        const reg = new RegExp(this.searchTitle, "i");
        this.firstData = this.items.filter(rt => {
          return reg.test(rt.title);
        });
        this.totalRows = this.firstData.length;
        return this.firstData.slice(0, 9);
      }
      if (this.selected) {
        if (this.selected == 1) {
          this.firstData = _sortBy(this.items, "created_at");
        } else {
          this.firstData = _sortBy(this.items, "created_at").reverse();
        }
        this.totalRows = this.firstData.length;
        return (this.firstData = this.firstData.slice(
          this.currentPage * 9,
          (this.currentPage + 1) * 9
        ));
      }
    }
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(
        "http://starlord.hackerearth.com/hackernews"
      );
      data.splice(0, 1);
      this.items = data;
      this.totalRows = this.items.length;
      this.firstData = data.slice(0, 9);
    },

    sortData() {
      this.firstData = this.items.slice(
        this.currentPage * 9,
        (this.currentPage + 1) * 9
      );
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style>
.column-style {
  padding: 20px;
}
.border-class {
  border-bottom: solid black;
}
.background-class {
  background: rgb(243, 240, 240);
}
</style>

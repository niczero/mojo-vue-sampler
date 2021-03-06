<template>
  <div id="app">
    <div class="container">
      <h2>Breadcrumb</h2>
      <div style="padding: 1rem;">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Library</a></li>
          <li class="breadcrumb-item active">Data</li>
        </ol>
      </div>

      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Either drag your file(s) here<br>or click to select
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" :key="item.url" :value="item.url">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
// swap as you need
import { upload } from './file-upload.fake.service' // fake service
// import { upload } from './file-upload.service' // real service
import { wait } from './utils'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  name: 'app',
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos'
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      upload(formData)
        .then(wait(1500)) // DEV ONLY: wait for 1.5s
        .then(x => {
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style lang="scss">
@import './style/override-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';

  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }

  .dropbox {
    background: lightcyan;
    color: dimgray;
    cursor: pointer;
    outline: 2px dashed grey;
    outline-offset: -10px;
    padding: 20px;
    position: relative;
  }

  .input-file {
    cursor: pointer;
    height: 100%;
    margin: -20px;
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  .dropbox:hover {
    background: lightblue;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
  }
</style>

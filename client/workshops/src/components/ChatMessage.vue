<template>
    <div class="row message">
        <div class="col-md-2 text-right">
            You:
        </div>
        <div class="col-md-10">
            <form novalidate>
                <input type="text" class="form-control" autofocus/>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class ChatMessage extends Vue {

    }
</script>

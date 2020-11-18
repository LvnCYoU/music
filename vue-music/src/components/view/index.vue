<template>
    <div>
        <span v-for="(item,index) in list" :style="{'--text': item.text, '--color': item.color}" :key="index"></span>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            list: [
                { text: '"中"', color: 'red' },
                { text: '"华"', color: 'orange' },
                { text: '"人"', color: 'yellow' },
                { text: '"民"', color: 'orange' },
                { text: '"共"', color: 'green' },
                { text: '"和"', color: 'cyan' },
                { text: '"国"', color: 'blue' }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
span::after {
    content: var(--text);
    background-color: var(--color);
}
</style>
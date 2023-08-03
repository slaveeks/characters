export default function (load: () => void) {
    window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            load();
        }
    }
}
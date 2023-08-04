/**
 * Create infinite scroll, and call callback, when it is the end of the page
 * @param load - callback, which will call, when scroll on the bottom
 */
export default function (load: () => void) {
    /**
     * Create event on scroll
     */
    window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const visibleHeight = document.documentElement.clientHeight;
        const totalHeight = document.documentElement.scrollHeight;

        /**
         * Check if it is the end of the page
         */
        if (scrollTop + visibleHeight >= totalHeight) {
            /**
             * Call callback
             */
            load();
        }
    }
}
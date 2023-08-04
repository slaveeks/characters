export default function (load: () => void) {
    window.onscroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        // Получаем высоту видимой области окна
        const visibleHeight = document.documentElement.clientHeight;

        // Получаем полную высоту документа
        const totalHeight = document.documentElement.scrollHeight;

        // Проверяем, достигли ли мы конца страницы
        if (scrollTop + visibleHeight >= totalHeight) {
            load();
            // Здесь вы можете выполнить нужные действия, когда страница находится в конце
        }
    }
}
export default function (element) {
    element.style.overflow = "hidden";

    // Împărțim pe RÂNDURI (la \n provenit din <br>), apoi pe CUVINTE.
    // Fiecare cuvânt e un <span class="word"> cu white-space:nowrap, deci NU
    // se rupe între litere — la wrap trece tot cuvântul pe rândul următor.
    // Literele rămân <span class="animatedis"> pentru animația de reveal.
    const lines = element.innerText.split("\n");
    let html = "";

    for (const line of lines) {
        html += '<span class="line">';
        const words = line.split(" ");

        words.forEach((word, index) => {
            html += '<span class="word">';
            for (const char of word) {
                html += `<span class="animatedis">${char}</span>`;
            }
            html += "</span>";

            // spațiu între cuvinte = punct de rupere pe rând nou
            if (index < words.length - 1) {
                html += "<span> </span>";
            }
        });

        html += "</span>";
    }

    element.innerHTML = html;
    return element;
}

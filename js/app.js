document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Imposta lo stile per il disegno
    ctx.lineWidth = 2; // Larghezza della linea
    ctx.lineJoin = 'round'; // Tipo di angolo quando due linee si incontrano
    ctx.lineCap = 'round'; // Tipo di estremità della linea

    // Funzione per aggiornare la larghezza della linea in base alla pressione
    function setLineWidth(pressure) {
        // Ad esempio, la larghezza della linea varia tra 0.5 e 5 in base alla pressione
        ctx.lineWidth = pressure * 4.5 + 0.5;
    }

    canvas.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'pen') {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            setLineWidth(e.pressure);
            console.log(`Inizio a disegnare in posizione: ${e.clientX}, ${e.clientY} con pressione: ${e.pressure}`);
        }
    });

    canvas.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'pen' && isDrawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            setLineWidth(e.pressure);
            ctx.stroke();
            console.log(`Mi sto muovendo in posizione: ${e.clientX}, ${e.clientY} con pressione: ${e.pressure}`);
        }
    });

    canvas.addEventListener('pointerup', (e) => {
        if (e.pointerType === 'pen') {
            isDrawing = false;
            console.log(`Ho finito di disegnare in posizione: ${e.clientX}, ${e.clientY} con pressione: ${e.pressure}`);
        }
    });

    canvas.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'pen') {
            isDrawing = false;
        }
    });

    // Disattiva il comportamento predefinito del browser per eventi come il drag & drop
    canvas.addEventListener('dragstart', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => e.preventDefault());
});

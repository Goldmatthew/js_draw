document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    canvas.addEventListener('pointerdown', (e) => {
        // Controlla se l'input è touch (oppure puoi rimuovere questa riga per gestire tutti i tipi di input)
        if (e.pointerType === 'touch') {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            console.log(`Inizio a disegnare in posizione: ${e.clientX}, ${e.clientY}`);
        }
    });

    canvas.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch' && isDrawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
            console.log(`Mi sto muovendo in posizione: ${e.clientX}, ${e.clientY}`);
        }
    });

    canvas.addEventListener('pointerup', (e) => {
        if (e.pointerType === 'touch') {
            isDrawing = false;
            console.log(`Ho finito di disegnare in posizione: ${e.clientX}, ${e.clientY}`);
        }
    });

    canvas.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'touch') {
            isDrawing = false;
        }
    });

    canvas.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'touch' && isDrawing) {
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
    });

    // Disattiva il comportamento predefinito del browser per eventi come il drag & drop
    canvas.addEventListener('dragstart', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => e.preventDefault());
});

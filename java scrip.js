document.addEventListener('DOMContentLoaded', function() {
    let selectedBase = null;
    let selectedToppings = [];


    // ELEMENTOS DINÁMICOS
    const caloriesValue = document.getElementById('calories-value');
    const proteinValue = document.getElementById('protein-value');
    const selectedBaseSpan = document.getElementById('selected-base');
    const selectedToppingsSpan = document.getElementById('selected-toppings');
    const resetBtn = document.getElementById('reset-btn');

    // ----------------- BASES -----------------
    const baseOptions = document.querySelectorAll('.base-option');
    baseOptions.forEach(option => {
        option.addEventListener('click', function() {
            baseOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            selectedBase = {
                name: this.querySelector('.base-name').textContent,
                calories: parseFloat(this.getAttribute('data-calories')),
                protein: parseFloat(this.getAttribute('data-protein')),
                icon: this.querySelector('.base-icon').textContent.trim()
            };
            updateNutritionInfo();
        });
    });

    // ----------------- TOPPINGS -----------------
    const toppingItems = document.querySelectorAll('.topping-item');
    toppingItems.forEach(item => {
        item.addEventListener('click', function() {
            const toppingName = this.querySelector('.topping-name').textContent;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedToppings = selectedToppings.filter(t => t.name !== toppingName);
            } else if (selectedToppings.length < 12) {
                this.classList.add('selected');
                selectedToppings.push({
                    name: toppingName,
                    calories: parseFloat(this.getAttribute('data-calories')),
                    protein: parseFloat(this.getAttribute('data-protein'))
                });
            } 
            updateNutritionInfo();
        });
    });

    // ----------------- ACTUALIZAR NUTRICIÓN -----------------
    function updateNutritionInfo() {
        let totalCalories = selectedBase ? selectedBase.calories : 0;
        let totalProtein = selectedBase ? selectedBase.protein : 0;

        selectedToppings.forEach(topping => {
            totalCalories += topping.calories;
            totalProtein += topping.protein;
        });

        caloriesValue.textContent = totalCalories.toFixed(1) + ' kcal';

        proteinValue.textContent = totalProtein.toFixed(1) + ' g';

        selectedBaseSpan.textContent = selectedBase ? selectedBase.name : 'Selecciona una base';
        const baseIconDiv = document.getElementById('base-icon');
baseIconDiv.textContent = selectedBase ? selectedBase.icon : '🍧';

        selectedToppingsSpan.textContent = selectedToppings.length > 0 
            ? selectedToppings.map(t => t.name).join(', ') 
            : 'Sin toppings seleccionados';
    }

    // ----------------- BOTÓN REINICIAR -----------------
    resetBtn.addEventListener('click', function() {
        selectedBase = null;
        selectedToppings = [];
        baseOptions.forEach(opt => opt.classList.remove('selected'));
        toppingItems.forEach(item => item.classList.remove('selected'));
        updateNutritionInfo();
    });

    // ----------------- ANIMACIÓN SCROLL -----------------
    const fadeElements = document.querySelectorAll('.fade-in');
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFade);
    checkFade();

    // ----------------- MODAL -----------------
    const botonesDetalles = document.querySelectorAll(".btn-detalles");
    const modal = document.querySelector(".modal");
    const modalTitulo = modal.querySelector("#modal-titulo");
    const modalDescripcion = modal.querySelector("#modal-descripcion");
    const modalCalorias = modal.querySelector("#modal-calorias");
    const modalProteinas = modal.querySelector("#modal-proteinas");
    const modalCarbohidratos = modal.querySelector("#modal-carbohidratos");
    const modalGrasas = modal.querySelector("#modal-grasas");
    const modalBeneficios = modal.querySelector("#modal-beneficios");
    const modalIcon = modal.querySelector("#modal-icon");
    const btnCerrar = modal.querySelector(".btn-cerrar");

    const productosInfo = {
        platano: {
            titulo: "Açaí con Plátano",
            descripcion: "Cremoso açaí con rodajas de plátano fresco para un sabor tropical único.",
            calorias: "73 kcal",
            proteinas: "0.9 g",
            carbohidratos: "18 g",
            grasas: "0.2 g",
            icon: "🍌",
            beneficios: [
                "Fuente natural de potasio",
                "Aporta energía rápida",
                "Mejora la digestión"
            ]
        },
        guayaba: {
            titulo: "Açaí con Nido",
            descripcion: "Dulzura láctea combinada con la potencia antioxidante del açaí.",
            calorias: "113 kcal",
            proteinas: "6.6 g",
            carbohidratos: "20 g",
            grasas: "6.6 g",
            icon: "🥛",
            beneficios: [
                "Alto contenido de proteínas y calcio",
                "Fortalece el sistema inmune",
                "Beneficioso para huesos y músculos"
            ]
        },
        nutella: {
            titulo: "Açaí con Nutella",
            descripcion: "La indulgencia perfecta: açaí mezclado con deliciosa Nutella.",
            calorias: "122 kcal",
            proteinas: "5.8 g",
            carbohidratos: "20 g",
            grasas: "7.6 g",
            icon: "🍫",
            beneficios: [
                "Alto en antioxidantes del cacao",
                "Energía inmediata",
                "Mejora el estado de ánimo"
            ]
        },
        nestle: {
            titulo: "Açaí con Nestlé",
            descripcion: "Cremoso açaí con trozos de chocolate Nestlé que añaden dulzura y textura crujiente.",
            calorias: "104 kcal",
            proteinas: "2.3 g",
            carbohidratos: "23 g",
            grasas: "2.0 g",
             icon: "🍦",
            beneficios: [
                "Calcio y proteínas de la leche",
                "Aporta energía inmediata",
                "Mejora el ánimo",
                "Opción más alta en azúcares añadidos",
            ]
        },
        maracuya: {
            titulo: "Bolo de Maracuya",
            descripcion: "Refrescante combinacion, 100% natural .",
            calorias: "48 kcal",
            proteinas: "0.6 g",
            carbohidratos: "12 g",
            grasas: "0.1 g",
            icon: "🥭",
            beneficios: [
                "Fuente de Vitamina C ",
                "Fuente de fibra",
                "Mejora la calidad del sueño"
            ]
        },
        fresa: {
            titulo: "Bolo de Fresa",
            descripcion: "Refrescante combinacion con pulpa de fresas frescas, 100% natural .",
            calorias: "41 kcal",
            proteinas: "0.5 g",
            carbohidratos: "10 g",
            grasas: "0.07 g",
            icon: "🍓",
            beneficios: [
                "Alto contenido en antioxidantes",
                "Fuente de Vitamina C",
                "Salud cardiovascular",
            ]
        },
        copoazu: {
            titulo: "Bolo de Copoazú",
            descripcion: "Refrescante combinacion con pulpa de Copoazú, 100% natural .",
            calorias: "48 kcal",
            proteinas: "0.1 g",
            carbohidratos: "15 g",
            grasas: "0.9 g",
            icon: "🍈",
            beneficios: [
                "Rico en Theobromina",
                "Fuente de Vitamina A",
                "Fuente de ácidos grasos omega-9"
            ]
        }

    };

    botonesDetalles.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            const productoId = card.getAttribute("data-product");
            const info = productosInfo[productoId];

            if (info) {
                modalTitulo.textContent = info.titulo;
                modalDescripcion.textContent = info.descripcion;
                modalCalorias.textContent = info.calorias;
                modalProteinas.textContent = info.proteinas;
                modalCarbohidratos.textContent = info.carbohidratos;
                modalGrasas.textContent = info.grasas;
                
                modalIcon.textContent = info.icon;

                modalBeneficios.innerHTML = "";
                info.beneficios.forEach((b) => {
                    const li = document.createElement("li");
                    li.textContent = b;
                    modalBeneficios.appendChild(li);
                });

                modal.style.display = "block";
            }
        });
    });

    const cerrarModal = () => modal.style.display = "none";
    btnCerrar.addEventListener("click", cerrarModal);
   
    window.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModal();
    });
});

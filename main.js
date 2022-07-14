/**
 * 
 * VERDULERIA
 * 
 * Objetivo: Poder vender frutas/verduras en un ecommerce
 * 
 * 1. Tengo que saber que productos voy a ofrecer
 * 2. Tengo que darle al cliente la posibilidad de comprar los productos que desee
 * 3. Debo darle la información de lo que esta comprando y su precio total / unitario.
 * 
 */

// Partiendo de una clase al usar la palabra reservada "new" -> Estoy INSTANCIANDO una clase 
// ¿ Que significa instanciar una clase ?
// Crear un objeto real, tangible a partir de la clase (Generamos un objeto)

/* CLASES */

class Producto {
    constructor(id, nombre, imagen, precioKilo) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precioKilo = precioKilo;
    }
}

class Carrito {
    constructor(id) {
        this.id = id;
        this.productos = [];
    }

    calcularTotal() {
        let total = 0;
        for(let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precioKilo;
        }
        return total;
    }

}

/* FUNCIONES */

function renderCard(producto) {
    let cardRendered = `    
    <div class="card m-3" style="width: 18rem;">
        <img src="./images/${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.id}.${producto.nombre}</h5>
            <p class="card-text">$ ${producto.precioKilo}</p>
            <a href="#" class="btn btn-primary botonDeCompra" id="${producto.id}">Agregar al carrito</a>
        </div>
    </div>
    `;
    return cardRendered;
}

function limpiarCarrito() {
    let divCarrito = document.querySelector("#carrito");
    divCarrito.innerHTML = "";
}

function actualizarCarrito(carrito) {
    let divCarrito = document.querySelector("#carrito");
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += renderCard(producto);
    })
    divCarrito.innerHTML += `<h1>Precio Total: $ ${carrito.calcularTotal()}</h1>`
}

function renovarStorage() {
    localStorage.removeItem("carrito"); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* Cargar carrito existente */
window.addEventListener('DOMContentLoaded', (e) => {
    let storage = JSON.parse(localStorage.getItem("carrito"));
    let carritoGuardado = new Carrito(storage.id, storage.productos);
    storage.productos.forEach(producto => {
        carritoGuardado.productos.push(producto);
    })
    limpiarCarrito();
    actualizarCarrito(carritoGuardado);
});

/* Generación de mi catálogo de productos */
let catalogoProductos = [];
let producto1 = new Producto(1, "Banana", "imagenBanana.jpg", 100);
let producto2 = new Producto(2, "Frutilla", "imagenFrutilla.jpg", 200);
let producto3 = new Producto(3, "Manzana", "imagenManzana.jpg", 300);
let producto4 = new Producto(4, "Durazno", "imagenDurazno.jpg", 400);
catalogoProductos.push(producto1);
catalogoProductos.push(producto2);
catalogoProductos.push(producto3);
catalogoProductos.push(producto4);

/* Generar mis tarjetas de productos */
let cardsDiv = document.querySelector("#cards");
catalogoProductos.forEach(producto => {
    cardsDiv.innerHTML += renderCard(producto);
})

/* Ingresar al carrito un producto */
let carrito = new Carrito(1);
let botones = document.querySelectorAll(".botonDeCompra");
let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        let productoSeleccionado = catalogoProductos.find(producto => producto.id == e.target.id);
        carrito.productos.push(productoSeleccionado);
        limpiarCarrito();
        actualizarCarrito(carrito);
        renovarStorage();
    })
});
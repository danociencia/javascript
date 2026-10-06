function eurosADolares(euros, cambio = 1.01) {
    return euros / cambio;
}

console.log(eurosADolares(100));
console.log(eurosADolares(100, 1.05));
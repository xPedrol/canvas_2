const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const circles = []
const total = 10
const colors = ['#e32451', 'gray', '#5a5c5c', '#d1dfe0', '#c0e8eb', '#dfeaeb']
const ctx = canvas.getContext('2d')
const mouse = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', function (event) {
    mouse.y = event.y
    mouse.x = event.x
})
window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    circles.forEach(circle=>{
        if(circle.x + circle.radius > canvas.width){
            circle.x = canvas.width - circle.radius
            circle.update()
        }
        console.log('dsa')
        if(circle.y + circle.radius > canvas.height){
            circle.y = canvas.height - circle.radius
            circle.update()
        }
    })
})

function Circle(x, y, radius, paceX, paceY) {
    this.x = x
    this.y = y
    this.radius = radius
    this.prevRadius = radius
    this.paceX = paceX
    this.paceY = paceY
    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.draw = function () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.stroke()
        ctx.fill()
    }
    this.update = function () {
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.paceX = -this.paceX
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.paceY = -this.paceY
        }
        this.grow()

        // console.log(this.paceX,this.paceY)
        this.draw()
    }
    this.grow = function () {
        if (mouse.x === 0 && mouse.y === 0) return
        if (mouse.x < this.x + 50 && mouse.x > this.x - 50 &&
            mouse.y < this.y + 50 && mouse.y > this.y - 50) {
            if (this.radius < 35) this.radius += 6
        } else if (this.radius > this.prevRadius) {
            this.radius -= 1
            if(this.radius < this.prevRadius){
                this.radius = this.prevRadius
            }
        }

    }
}

function generateCircles() {
    for (let i = 0; i < total; i++) {
        const randRadius = 0.7 + Math.floor(Math.random() * 10)
        const randX = randRadius + Math.floor(Math.random() * (canvas.width + 1 - (randRadius * 2)))
        const randY = randRadius + Math.floor(Math.random() * (canvas.height + 1 - (randRadius * 2)))
        const pace = 0.2 + Math.random() * 0.6
        const paceX = Math.round(Math.random()) === 1 ? pace : -pace
        const paceY = Math.round(Math.random()) === 1 ? pace : -pace
        circles.push(new Circle(randX, randY, randRadius, paceX, paceY))
    }
}

generateCircles()

function main() {
    requestAnimationFrame(main)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    circles.forEach(circle => circle.update())
}

main()
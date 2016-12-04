const seed = [
  [1, 5],
  [1, 6],
  [2, 5],
  [2, 6],
  [11, 5],
  [11, 6],
  [11, 7],
  [12, 4],
  [12, 8],
  [13, 3],
  [13, 9],
  [14, 3],
  [14, 9],
  [15, 6],
  [16, 4],
  [16, 8],
  [17, 5],
  [17, 6],
  [17, 7],
  [18, 6],
  [21, 3],
  [21, 4],
  [21, 5],
  [22, 3],
  [22, 4],
  [22, 5],
  [23, 2],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4],

  [60, 47],
  [61, 47],
  [62, 47],
  [60, 48],
  [61, 48],
  [62, 48],
  [60, 49],
  [61, 49],
  [62, 49],
  [60, 51],
  [61, 51],
  [62, 51],

  [60, 67],
  [61, 67],
  [62, 67],
  [60, 68],
  [61, 68],
  [62, 68],
  [60, 69],
  [61, 69],
  [62, 69],
  [60, 71],
  [61, 71],
  [62, 71],

  [80, 67],
  [81, 67],
  [82, 67],
  [80, 68],
  [81, 68],
  [82, 68],
  [80, 69],
  [81, 69],
  [82, 69],
  [80, 71],
  [81, 71],
  [82, 71],
]

class Game {
  constructor(n=10){
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.size = this.canvas.width / n
    this.n = n
    this.buildGrid(n)
    this.setupEvents()    
    this.sizeCanvas()
  }

  setupEvents(){
    window.addEventListener('resize', () => this.sizeCanvas())
  }

  sizeCanvas(){
    const width = window.innerWidth * .75
    this.canvas.width = width
    this.canvas.height = width
    this.size = width / this.n
    this.drawGrid()
  }

  buildGrid(n) {
    this.size = this.ctx.canvas.width / n

    const arr = []
    for (let i = 0; i < n; i++) {
      arr[i] = []
      for (let j = 0; j < n; j++) {
        arr[i][j] = 0
      }
    }
    
    this.grid = arr
    this.seedGrid(seed)
  }

  seedGrid(seed) {
    seed.forEach(i => {
      const x = i[0]
      const y = i[1]
      this.grid[x][y] = 1
    })
  }

  getNeighbors(arr, x, y) {
    let count = 0

    const checkArr = (x, y) => arr[x] && arr[x][y]

    // top left
    if (checkArr(x - 1, y - 1)) count++

    // top mid
    if (checkArr(x - 1, y)) count++

    // top right
    if (checkArr(x - 1, y + 1)) count++

    // mid left
    if (checkArr(x, y - 1)) count++

    // mid right
    if (checkArr(x, y + 1)) count++

    // bottom left
    if (checkArr(x + 1, y - 1)) count++

    // bottom mid
    if (checkArr(x + 1, y)) count++

    // bottom right
    if (checkArr(x + 1, y + 1)) count++

    return count
  }

  updateGrid() {

    const updated = this.grid.map((row, x) => {      
      return row.map((cell, y) => {
        
        const n = this.getNeighbors(this.grid, x, y)        
        
        // live cell
        if (cell === 1) {
          return (n === 2 || n === 3) ? 1 : 0
        // dead cell
        } else {
          return (n === 3) ? 1 : 0
        }
      })
    })

    this.grid = updated 

    requestAnimationFrame(() => this.drawGrid())
  }

  drawGrid() {
    const ctx = this.ctx
    const size = this.size
    const grid = this.grid.slice()

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = "#1081B1"
    ctx.strokeStyle = "#D8D8D8"
    ctx.strokeWidth = 0.5

    grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        ctx.beginPath()
        ctx.rect(x * size, y * size, size, size)
        if (cell === 0) {
          ctx.stroke()
        } else {
          ctx.fill()
        }
      })
    })

    this.updateGrid()
  }
}

new Game(100)









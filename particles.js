class Particle {
  constructor(x,z, t) {
      this.x = x * 15 * 5
      this.z = z * 15 * 3
      this.offset = sqrt(sq(x)+sq(z)) / 2
      this.t = t
  }
  height(f) {
    return sq(sin(-f + this.offset)) * 15 + 15 * this.t
  }

  render(f) {
    push()
      this.y = 5*this.height(f)
      fill(255)
      rotateX(spin.x)
      rotateY(spin.y)
      translate(this.x, this.y, this.z)
      sphere(.75, 24, 24)
    pop()
  }
}

const boxes = []
let speed = 5
let pointColor = "#FFFFFF"
let ambientColor = "#FFFFFF"
let materialColor = "#FFFFFF"
let spin = {}
let autospin
let zoom = 700

const particleCount = 10

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL)
  noStroke()

  for (let z = -particleCount; z <= particleCount; z++) {
    for (let x = -particleCount; x <= particleCount; x++) {
      let b = new Particle(x, z, 0)
      boxes.push(b)
    }
  }

  spin.x = PI/2
  spin.y = 0
}

let layer = 1

function keyPressed() {
  if (keyCode == UP_ARROW) {
    for (let z = -particleCount; z <= particleCount; z++) {
      for (let x = -particleCount; x <= particleCount; x++) {
        let b = new Particle(x, z, layer)
        boxes.push(b)
      }
    }
    layer++
  } else if (keyCode == DOWN_ARROW) {
    if (boxes.splice(-(2*particleCount+1)*(2*particleCount+1),(2*particleCount+1)*(2*particleCount+1)).length != 0)
      layer--;
  }
}

function draw() {
  background("#060606")
  let f = frameCount/sq(speed)
  for (let b of boxes) {
    b.render(f)
  }
}

function mouseDragged() {
  spin.y = (spin.y + (TAU * (mouseX - pmouseX)/width) * (sin(spin.x) < 0 ? 1 : -1)) % TAU
  spin.x = (spin.x - (TAU * (mouseY - pmouseY)/height)) % TAU
}

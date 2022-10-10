const navWrapper = document.querySelector('.navbar__wrapper')

navWrapper.addEventListener('wheel', (evt) => {
  evt.preventDefault();
  evt.currentTarget.scrollLeft += evt.deltaY;
})

export function setNavbarPosition() {
  navWrapper.querySelectorAll('button').forEach(i => {
    const s = i.getBoundingClientRect()
    setTimeout(e => {
      if (i.classList.contains('active') && (s.right > window.innerWidth || s.x < 0)) {
        // console.log(s, navWrapper.scrollWidth);
        // console.log(s.right, s.left - (s.width / 2));
        // console.log(window.innerWidth);
        // navWrapper.scrollBy(s.x < 0 ? s.width * -1 : s.width, 0)
        // navWrapper.scrollTo({ left: s.x - (s.width / 2), behavior: 'smooth' })
        i.scrollIntoView({ inline: 'center', behavior: "smooth" })
      }
    }, 300)
  })
}
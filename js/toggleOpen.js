export function toggle(element) {
    let isOpen = element.classList.contains('open');
  
    if (!isOpen) {
      element.classList.add('open');
    } else {
      element.classList.remove('open');
    }
  
    console.log(isOpen);
    console.log(element);
  }

const value = '';

const recieveValue = (event) => {
    // eslint-disable-next-line no-const-assign
    value = event.target.value;
}

const shareValue = () => {
    const tam = value;
    return tam;
}

export {recieveValue, shareValue};

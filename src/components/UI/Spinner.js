import classes from './Spinner.module.css';
const Spinner = () => {
    return(
        <div className={classes['container__spinner']}>
            <span className={classes["loader-6"]}></span>
        </div>
    );
};

export default Spinner;
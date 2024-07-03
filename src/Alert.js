/* PROPS
 *   - None
 *
 * STATE
 *   - None
 *
 * RoutesList -> SignupForm -> (( Alert )) */
function Alert({ message }) {
  return (
    <div className="Alert">
      <p>{message}</p>
    </div>
  );
}

export default Alert;
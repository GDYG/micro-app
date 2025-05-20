export function useConsole() {
  useEffect(() => {
    console.log("shared hooks from main！");
  }, []);
}

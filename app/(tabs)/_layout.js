import {Tabs} from 'expo-router';
export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title:"Inicio", href:null}} />
      <Tabs.Screen name="alta" options={{title:"Alta"}} />
      <Tabs.Screen name="consulta" optionns={{title:"Consulta"}} />
    </Tabs>
  );
}
import { supabase } from '@/lib/supabase'

export async function createCitaByPaciente ({ data }: { data: CitasInsert }) {
  const { data: citasInsert, error: errorCitasInsert } = await supabase
    .from('citas')
    .insert({ ...data })
    .select('*, paciente:personas!citas_id_paciente_fkey(*), doctor:personas!citas_id_doctor_fkey(*) ')
    .single()
  return { citasInsert, errorCitasInsert }
}

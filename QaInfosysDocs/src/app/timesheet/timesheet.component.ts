// En el archivo del componente
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  formularioExcel: FormGroup;
  actividades: any[] = []; // Fuente de datos para las actividades
  fechasMes: Date[] = []; // Fechas para las columnas de los días

  constructor(private fb: FormBuilder) {
    // Simular datos de actividades
    this.actividades = [
      { actividad: 'Actividad 1' },
      { actividad: 'Actividad 2' },
      { actividad: 'Actividad 3' },
      { actividad: 'Actividad 4' },
      { actividad: 'Actividad 5' },
      { actividad: 'Actividad 6' },
      // ... más actividades ...
    ];

    // Crear el formulario
    this.formularioExcel = this.fb.group({
      actividad: ['', Validators.required],
    });

    // Obtener las fechas del mes actual
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    // Generar fechas para las columnas de los días
    for (let fecha = new Date(primerDiaMes); fecha <= ultimoDiaMes; fecha.setDate(fecha.getDate() + 1)) {
      this.fechasMes.push(new Date(fecha));
    }

    // Agregar columnas para los días del mes al formulario
    this.fechasMes.forEach(fecha => {
      const fechaString = fecha.toISOString().split('T')[0];
      this.formularioExcel.addControl(fechaString, this.fb.control('', this.validarCelda));
    });
  }

  ngOnInit() {
    // Puedes cargar datos adicionales desde una fuente externa aquí
  }

  validarCelda(control: any) {
    // Validación para datos numéricos
    const valor = control.value;
    if (valor !== null && valor !== '' && isNaN(Number(valor))) {
      return { 'invalidNumber': true };
    }
    return null;
  }

  guardarDatos() {
    // Método para guardar los datos, puedes implementar la lógica aquí
    console.log(this.formularioExcel.value);
  }

  esFinDeSemana(_t14: any) {
    return false;
    }
}

<template>
	
		<div class="p-col-12">
			<div>
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="Nuevo participante" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="participantes" v-model:selection="selectedEventodetalles" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
					<template #header>
						<div class="table-header">
							<h5 class="p-m-0">Administrar Eventodetalles</h5>
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column field="_id" header="_id" :sortable="true"></Column> -->
					<Column field="idEventoparticipante" header="Evento" :sortable="true"></Column>
					<Column field="nombresparticipante" header="nombres" :sortable="true"></Column>
                    <Column field="detallesparticipante" header="detalle" :sortable="true"></Column>
                    <Column field="costoinscripcionparticipante" header="inscripcion" :sortable="true"></Column>
					<Column :colspan="1">
						<template #body="slotProps" >
							<Button label="Detalles" icon="pi-angle-double-right" class="p-button-rounded p-button-primary p-mr-1" @click="detalleEventodetalle(slotProps.data)" />
							<Button label="Editar" icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-1" @click="editarEventodetalle(slotProps.data)" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteEventodetalle(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="eventoDialog" :style="{width: '450px'}" :header="cambiarHeader" :modal="true" :class="cambiarColor">	

					<!-- <img :src="'assets/layout/images/product/' + product.image" :alt="product.image" class="evento-image" v-if="product.image" /> -->
					<div class="p-field">
						<label for="nombres">Fecha</label>
						<Calendar id="dateformat" v-model="evento.fechaevento"  dateFormat="mm-dd-yy" />
					</div>
					<div class="p-field">
                        <label for="detalleevento">Nombre Eventodetalle</label>
                        <InputText id="detalleevento" v-model.trim="evento.detalleevento" required="true" autofocus :class="{'p-invalid': submitted && !evento.detalleevento}" />
                        <small class="p-invalid" v-if="submitted && !evento.detalleevento">El nombre del evento es requerido.</small>
                    </div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Continuar" icon="pi pi-check" class="p-button-text" @click="saveEventodetalle" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteEventodetalleDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="evento">Are you sure you want to delete <b>{{evento.nombreEventodetalle}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEventodetalleDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteEventodetalle(evento)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteEventodetallesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="confirmation-content">
						<i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
						<span v-if="evento">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEventodetallesDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedEventodetalles" />
					</template>
				</Dialog>
			</div>
		</div>
</template>

<script>
import ParticipanteService from '../../../service/participante/participanteService'
class Eventodetalle{
	constructor(idEvento = '', idProveedor = '', idProducto = '', costoProductounitario='', cantidadProductounitario='',subtotalProductounitario=''){
		this.idEvento = idEvento
		this.idProveedor = idProveedor
		this.idProducto = idProducto
		this.costoProductounitario = costoProductounitario
        this.cantidadProductounitario = cantidadProductounitario
        this.subtotalProductounitario = subtotalProductounitario
	}
}

export default {
	components:{
	},
    props:{
        dataEvento: Object
    },
	data() {
		return {
            participantes: [],
            evento: {},
			eventosdetalles: [],
			status:null,
			estados: [
				{ value: 'Activo', text: 'Activo' },
				{ value: 'Inactivo', text: 'Inactivo' }
			],
			eventoDialog: false,//usar
			nuevo: false,
			deleteEventodetalleDialog: false,
			deleteEventodetallesDialog: false,
			selectedEventodetalle: null,
			selectedEventodetalles: null,
			filters: {},
			submitted: false,
			existenciaSeleccion: false ,
		}
	},
	participanteService: null,
	eventoService: null,
	created() {
        this.participanteService = new ParticipanteService()
	},
	async mounted() {
        await this.participanteService.filtroIdEvento(this.dataEvento[0]._id).then(data =>this.participantes = data.data )
	},
	updated(){
		if (this.selectedEventodetalles == null) {
			this.existenciaSeleccion = false
		}else if(this.selectedEventodetalles.length == 1){
			this.existenciaSeleccion = true
		} else {
			this.existenciaSeleccion = false
		}
	},
	methods: {

		openNew() {
			this.evento = new Eventodetalle();
			this.eventoDialog = true
			this.submitted = false;
			this.nuevo = false
		},
		hideDialog() {
			this.eventoDialog = false;
			this.submitted = false;
		},
		editarEventodetalle(evento){
			this.eventoDialog = true
			this.evento = evento
		},
		async detalleEventodetalle(evento){
			this.evento = evento
			await this.participanteService.readEventodetallexId(evento._id).then(data=>this.eventosdetalles = data.data)
			this.$emit('EventEventodetalle', {data1: this.userACargo, data2: this.evento, data3: this.eventosdetalles, mostrarEventodetalle: false, mostrarEventodetalledetalle : true})
		},
		async saveEventodetalle() {//-------------------------------------------------------------
            this.submitted = true
			const validacion =  !this.evento.fechaevento == '' && 
                                !this.evento.detalleevento == ''
            if (validacion) {
                if(!this.nuevo === true) {
					this.eventoDialog = false
					//console.log('estoy en if');
					this.$emit('EventEventodetalle', {data1: this.user, data2: this.evento, data3: null, mostrarEventodetalle: false, mostrarEventodetalledetalle : true})
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});		
                }else {
					this.eventoService.read().then(data =>this.participantes = data.data)
                    this.getEventodetalle(this.evento)
					//console.log('estoy en else');
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                }
            }else{
				//console.log('estoy fuera de else');
                this.eventoDialog = true
            }
		},
		getEventodetalle(evento) {
			this.nuevo = true
			this.eventoService.readEventodetalle(evento._id).then(data =>{
				const { TipoEventodetalle, nombreEventodetalle, descripcion, status, direccion } = data;
				this.evento = new Eventodetalle(TipoEventodetalle, nombreEventodetalle, descripcion, status, direccion );
				this.eventoDialog = true
			})
		},
		async deleteEventodetalle(evento) {
			this.evento = evento
			//console.log(this.evento);
			await this.participanteService.readEventodetallexId(evento._id).then(data=>this.eventosdetalles= data.data)
			//console.log(this.eventosdetalles);
				for (let index = 0; index < this.eventosdetalles.length; index++) {
					await this.participanteService.delete(this.eventosdetalles[index]._id)
				}
			await this.eventoService.delete(this.evento._id)
			await this.eventoService.read().then(data=>this.participantes = data.data)
			this.deleteEventodetalleDialog = false
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
		},
		confirmDeleteEventodetalle(evento) {
			this.evento = evento;
			this.deleteEventodetalleDialog = true;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
	}, 
	computed:{
		cambiarHeader(){
			return this.nuevo ? 'Editar' : 'Nuevo'
		},
		cambiarColor(){
			return this.nuevo ? 'p-fluid' : 'p-fluid'
		},
		cambiarClass(){
			//console.log(this.selectedEventodetalles);
			return (!(!this.selectedEventodetalles || !this.selectedEventodetalles.length) && this.existenciaSeleccion) ? 'p-col-6' : 'p-col-12'
		}
	}
}
</script>

<style scoped lang="scss">
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.evento-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .evento-image {
	width: 150px;
	margin: 0 auto 2rem auto;
	display: block;
}

.confirmation-content {
	display: flex;
	align-items: center;
	justify-content: center;
}

.evento-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}
</style>

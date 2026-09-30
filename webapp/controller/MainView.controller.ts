import Controller from 'sap/ui/core/mvc/Controller';
import JSONModel from 'sap/ui/model/json/JSONModel';
import Filter from 'sap/ui/model/Filter';
import FilterOperator from 'sap/ui/model/FilterOperator';
import Event from 'sap/ui/base/Event';
import { SelectionScreenMenu } from '../interfaces/SelectionScreenMenu.interface';
import ListBinding from 'sap/ui/model/ListBinding'; // 1. IMPORTA EL LISTBINDING
import List from 'sap/m/List';

/**
 * @namespace logaligroup.invoices.controller
 */
export default class MainView extends Controller {
  public onInit(): void {
    const oJSONModel = new JSONModel();
    const oView = this.getView();
    const sJsonPath = sap.ui.require.toUrl(
      'logaligroup/invoices/model/SelectionScreenMenu.json',
    );
    oJSONModel.loadData(sJsonPath);
    oView?.setModel(oJSONModel, 'selectionScreen');
  }

  public onFilter(oEvent: Event): void {
    const oData: SelectionScreenMenu = this.getJSONModel('selectionScreen')?.getData();
    let filters: Filter[] = [];

    if (oData.shipName !== '') {
      filters.push(
        new Filter('ShipName', FilterOperator.Contains, oData.shipName),
      );
    }

    if (oData.countryKey !== '') {
      filters.push(new Filter('Country', FilterOperator.EQ, oData.countryKey));
    }

      this.setFilters(filters);

  }

  public onClearFilter(): void {
    const oModelSelScreen = this.getJSONModel('selectionScreen');
    oModelSelScreen?.setProperty('/shipName', '');
    oModelSelScreen?.setProperty('/countryKey', '');
    this.setFilters([]);
  }

  /**
   * Helper para obtener modelos JSON mapeados con su tipo correcto
   */
  private getJSONModel(sName?: string): JSONModel | undefined {
    return this.getView()?.getModel(sName) as JSONModel;
  }

  /**
   * Helper para aplicar filtros al listado
   */
  private setFilters(filters: Filter[]) {
    // Buscamos el control List de la vista
    const oList = this.getView()?.byId('invoicesList') as List;
    if (oList) {
      // HACEMOS EL CAST A 'ListBinding' PARA QUE RECONOZCA EL MÉTODO .filter()
      const oBinding = oList.getBinding('items') as ListBinding;
      
      if (oBinding) {
        oBinding.filter(filters); // Se envian los filtros aplicados
      }
    }
  }
}

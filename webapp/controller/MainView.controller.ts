import Controller from 'sap/ui/core/mvc/Controller';
import JSONModel from 'sap/ui/model/json/JSONModel';
import Event from 'sap/ui/base/Event';

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

  public onFilter(oEvent: Event): void {}

  public onClearFilter(): void {
    const oModelSelScreen = this.getView()?.getModel(
      'selectionScreen',
    ) as JSONModel;
    oModelSelScreen.setProperty('/shipName', '');
    oModelSelScreen.setProperty('/countryKey', '');
  }
}

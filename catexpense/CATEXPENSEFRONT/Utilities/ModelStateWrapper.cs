using System.Web.Http.ModelBinding;
using CatExpenseFront.Services.Interfaces;

namespace CatExpenseFront.Utilities
{
    public class ModelStateWrapper : IValidationDictionary
    {
        private ModelStateDictionary modelState;

        public ModelStateWrapper(ModelStateDictionary modelState)
        {
            this.modelState = modelState;
        }

        public void AddError(string key, string errorMessage)
        {
            modelState.AddModelError(key, errorMessage);
        }

        public bool IsValid
        {
            get { return modelState.IsValid; }
        }
    }
}
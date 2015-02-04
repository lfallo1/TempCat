using System.Collections.Generic;

namespace CatExpenseFront.Services
{
    public interface IService<TObject> where TObject : class
    {
        IEnumerable<TObject> All();

        TObject Create(TObject tobject);

        int Update(TObject tobject);

        void SaveChanges();

        TObject Find(int id);

        int Delete(TObject tobject);

        IEnumerable<TObject> CreateAll(IEnumerable<TObject> tobjects);
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using LOGGER = Logger.Logger;

namespace CatExpenseFront.Repository
{
    public class Repository<TObject> : IDisposable, IRepository<TObject> where TObject : class
    {
        private DB context = null;

        ~Repository()
        {
            Dispose(false);
        }

        public Repository()
        {
            context = new DB();
        }

        public Repository(DB context)
        {
            this.context = context;
            context.Configuration.ValidateOnSaveEnabled = false;
        }

        protected DbSet<TObject> DbSet
        {
            get
            {
                return context.Set<TObject>();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            // Multiple Dispose calls should be OK
            if (!Disposed)
            {
                if (disposing)
                {
                    // None of our fields have been finalized so it's safe to
                    // clean them up here
                    if (context != null)
                    {
                        context.Dispose();
                    }
                }

                // Our fields may have been finalized so we should only touch
                // native fields (e.g. IntPtr or UIntPtr fields) here.
                Disposed = true;
            }
        }

        protected bool Disposed
        {
            get;
            private set;
        }

        public virtual IQueryable<TObject> All()
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.AsQueryable();
        }

        public virtual IEnumerable<TObject> AsEnumerable()
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.AsEnumerable();
        }

        public virtual TObject Find(params object[] keys)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.Find(keys);
        }

        public virtual IEnumerable<TObject> SqlQuery(string sql)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.SqlQuery(sql).AsEnumerable();
        }

        public virtual TObject SqlQuery(string sql, params object[] keys)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.SqlQuery(sql, keys).FirstOrDefault();
        }

        public virtual TObject Create(TObject tobject)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.Add(tobject);
        }

        public virtual IEnumerable<TObject> CreateAll(IEnumerable<TObject> tobjects)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            return DbSet.AddRange(tobjects);
        }

        public virtual int Count
        {
            get
            {
                return DbSet.Count();
            }
        }

        public virtual int Delete(TObject tobject)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            DbSet.Remove(tobject);
            return 0;
        }

        public virtual int Update(TObject tobject)
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            var entry = context.Entry(tobject);
            DbSet.Attach(tobject);
            entry.State = System.Data.Entity.EntityState.Modified;
            return 0;
        }

        public void SaveChanges()
        {
            // In general all public methods should throw ObjectDisposedException
            // if Dispose has been called.
            if (Disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
            try
            {
                context.SaveChanges();
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException e)
            {
                LOGGER.GetLogger("StackTrace").LogError(e.ToString() + "\nThis exception is thrown because the projects are not all in the proper db. Try updating the projects and resubmitting.");
            }
        }
    }
} 

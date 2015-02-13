using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using LOGGER = Logger.Logger;

namespace CatExpenseFront.Repository
{
    /// <summary>
    /// Class used to access db resources.
    /// </summary>
    /// <typeparam name="TObject"></typeparam>
    public class Repository<TObject> : IDisposable, IRepository<TObject> where TObject : class
    {
        private DB context = null;

        /// <summary>
        /// Destructor
        /// </summary>
        ~Repository()
        {
            Dispose(false);
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public Repository()
        {
            context = new DB();
        }

        /// <summary>
        /// Contructor that accepts a context
        /// </summary>
        /// <param name="context"></param>
        public Repository(DB context)
        {
            this.context = context;
            context.Configuration.ValidateOnSaveEnabled = false;
        }

        /// <summary>
        /// Returns the inialised context.
        /// </summary>
        protected DbSet<TObject> DbSet
        {
            get
            {
                return context.Set<TObject>();
            }
        }

        /// <summary>
        /// destroy the instance
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Multiple Dispose 
        /// </summary>
        /// <param name="disposing"></param>
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

        /// <summary>
        /// Returns a flag for disposed.
        /// </summary>
        protected bool Disposed
        {
            get;
            private set;
        }

        /// <summary>
        /// Returns all of an object.
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// In general all public methods should throw ObjectDisposedException
        /// if Dispose has been called.
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Searches for a single entry by id.
        /// </summary>
        /// <param name="keys"></param>
        /// <returns></returns>
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

        /// <summary>
        /// queries the database.
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Queries the database with parameters.
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="keys"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Creates a new Object.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Creates a list of objects in the database.
        /// </summary>
        /// <param name="tobjects"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Returns a count.
        /// </summary>
        public virtual int Count
        {
            get
            {
                return DbSet.Count();
            }
        }

        /// <summary>
        /// Removes an item from the database.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Updates an item in the database.
        /// </summary>
        /// <param name="tobject"></param>
        /// <returns></returns>
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

        /// <summary>
        /// commits the changes to the database.
        /// </summary>
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

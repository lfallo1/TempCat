using HibernatingRhinos.Profiler.Appender.EntityFramework;

[assembly: WebActivator.PreApplicationStartMethod(typeof(CatExpenseFront.App_Start.EntityFrameworkProfilerBootstrapper), "PreStart")]
namespace CatExpenseFront.App_Start
{
	public static class EntityFrameworkProfilerBootstrapper
	{
		public static void PreStart()
		{
			// Initialize the profiler
			EntityFrameworkProfiler.Initialize();
			
			// You can also use the profiler in an offline manner.
			// This will generate a file with a snapshot of all the EntityFramework activity in the application,
			// which you can use for later analysis by loading the file into the profiler.
			
			
		}
	}
}

